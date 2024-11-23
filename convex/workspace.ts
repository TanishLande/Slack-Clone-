import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";
import { getAuthUserId } from "@convex-dev/auth/server";

const generateCode = () => {
    const code = Array.from(
        { length: 6 },
        () => 
            "0123456789abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 36)]
    ).join("");

    return code;
}


export const create = mutation({
    args:{
        name: v.string(),
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);

        if(!userId){
            throw new Error("Unauthorized");
        }

        const joinCode = generateCode();

        const workspaceId = await ctx.db.insert("workspaces",{
            name: args.name,
            userId,
            joinCode
        });

        await ctx.db.insert("members",{
            userId,
            workspaceId,
            role: "admin"
        })

        await ctx.db.insert("channels", {
            name: "general",
            workspaceId
        })


        return workspaceId;

    }
})

export const getInfoById = query({
  args: {id: v.id("workspaces")},
  handler: async(ctx,args) => {
    const userId  =  await auth.getUserId(ctx);

    if(!userId){
        throw new Error("Unauthrized");
    }

    const member = await ctx.db
            .query("members")
            .withIndex("by_workspace_id_user_id", (q) => 
                q.eq("workspaceId", args.id).eq("userId", userId)
            )
            .unique();

    const workspace =  await ctx.db.get(args.id);

    return{
        name: workspace?.name,
        isMember: !!member
    }

  }  
})

export const join = mutation({
    args:{
        joinCode: v.string(),
        workspaceId: v.id("workspaces")
    },
    handler: async(ctx, args) => {
        const userId = await auth.getUserId(ctx);

        if(!userId){
            throw new Error("unauthorized");
        }

        const workspace = await ctx.db.get(args.workspaceId);

        if(!workspace){
            throw new Error("Workspace not found");
        }

        if(workspace.joinCode !== args.joinCode.toLowerCase()) {
            throw new Error("Invalid join code ");
        }

        const existingMember = await ctx.db
            .query("members")
            .withIndex("by_workspace_id_user_id", (q) => 
                q.eq("workspaceId", args.workspaceId).eq("userId", userId)
            )
            .unique();

        if(existingMember){
            throw new Error("Already member so this workspace");
        }

        await ctx.db.insert("members", {
            userId,
            workspaceId: workspace._id,
            role: "member"
        })

    }
});

export const newJoinCode = mutation({
    args: {
        workspaceId: v.id("workspaces"),
    },
    handler: async (ctx,args) => {
        const userId = await auth.getUserId(ctx);

        if(!userId){
            throw new Error("unauthorized");
        }

        const member = await ctx.db
            .query("members")
            .withIndex("by_workspace_id_user_id", (q) => 
                q.eq("workspaceId", args.workspaceId).eq("userId", userId)
            )
            .unique();
            
            if(!member || member.role !== "admin"){
                throw new Error("unauthorized")
            }

            const joinCode = generateCode();

            await ctx.db.patch(args.workspaceId,{
                joinCode
            })

            return args.workspaceId;
      }

})

export const get =  query({
    args: {},
    handler: async (ctx) => {
        const userId = await auth.getUserId(ctx);
        
        if(!userId){
            return [];
        }

        const members = await ctx.db
        .query("members")
        .withIndex("by_user_id", (q) => q.eq("userId", userId))
        .collect();

        const workspaceIds = members.map((member) => member.workspaceId);

        const workspaces = [];

        for (const workspaceId of workspaceIds){
            const workspace = await ctx.db.get(workspaceId);

            if(workspaceId){
                workspaces.push(workspace);
            }
        }

       return workspaces;
    }
})

export const getUserId = query({
    args: {
        id: v.id("workspaces")
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);

        if(!userId){
            throw Error("Unauthorized");
        }

        const member = await ctx.db
        .query("members")
        .withIndex("by_workspace_id_user_id", (q) => 
          q.eq("workspaceId", args.id).eq("userId", userId),
        )
        .unique();

        if(!member){
            return null;
        }

        return await ctx.db.get(args.id);
    }
})



///Fucntion to update the anem of wokrspace
export const update = mutation({
  args: {
    id: v.id("workspaces"),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);

    if (!userId) {
      throw new Error("Unauthorized");
    }

    // Verify user has permission to update this workspace
    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) =>
        q.eq("workspaceId", args.id).eq("userId", userId)
      )
      .unique();

    if (!member || member.role !== "admin") {
      throw new Error("Unauthorized");
    }

    // Update the workspace
    const workspace = await ctx.db.patch(args.id, {
      name: args.name,
    });

    return workspace;  
  },
});



///function to delete the workspace
export const remove = mutation({
    args: {
        id: v.id("workspaces"),
    },
    handler: async (ctx, args) => {
        // Get the authenticated user
        const userId = await getAuthUserId(ctx);
        
        if (!userId) {
            throw new Error("Unauthorized: You must be logged in");
        }

        // Check if user is an admin of the workspace
        const member = await ctx.db
            .query("members")
            .withIndex("by_workspace_id_user_id", (q) => 
                q.eq("workspaceId", args.id).eq("userId", userId)
            )
            .unique();

        if (!member || member.role !== "admin") {
            throw new Error("Unauthorized: Only workspace admins can delete workspaces");
        }

        // Delete all workspace members
        const members = await ctx.db
            .query("members")
            .withIndex("by_workspace_id", (q) => 
                q.eq("workspaceId", args.id)
            )
            .collect();

        // Use Promise.all for parallel deletion of members
        await Promise.all(
            members.map((member) => ctx.db.delete(member._id))
        );

        // Delete the workspace itself
        await ctx.db.delete(args.id);

        return args.id;
    },
});