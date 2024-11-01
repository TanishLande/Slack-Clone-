import { useMutation } from "convex/react";
import { useCallback, useMemo, useState } from "react";
import { Id } from "../../../../../convex/_generated/dataModel";
import { api } from "../../../../../convex/_generated/api";

type RequestType = {
    id: Id<"workspaces">
};

type ResponseType = Id<"workspaces"> | null;

type Options = {
    onSuccess?: (data: ResponseType) => void;
    onError?: (error: Error) => void;
    onSettle?: () => void;
    throwError?: boolean;
};

type Status = "idle" | "pending" | "success" | "error" | "settled";

export const useRemoveWorkspace = () => {
    const [data, setData] = useState<ResponseType>(null);
    const [error, setError] = useState<Error | null>(null);
    const [status, setStatus] = useState<Status>("idle");

    const mutation = useMutation(api.workspace.remove);

    const isPending = useMemo(() => status === "pending", [status]);
    const isSuccess = useMemo(() => status === "success", [status]);
    const isError = useMemo(() => status === "error", [status]);
    const isSettled = useMemo(() => status === "settled", [status]);

    const mutate = useCallback(
        async (values: RequestType, options?: Options) => {
            try {
                setData(null);
                setError(null);
                setStatus("pending");

                const response = await mutation(values);
                
                setData(response);
                setStatus("success");
                options?.onSuccess?.(response);

                return response;
            } catch (error) {
                const errorObj = error instanceof Error ? error : new Error("An unknown error occurred");
                setError(errorObj);
                setStatus("error");
                options?.onError?.(errorObj);

                if (options?.throwError) {
                    throw errorObj;
                }
            } finally {
                setStatus("settled");
                options?.onSettle?.();
            }
        },
        [mutation]
    );

    return {
        mutate,
        data,
        error,
        isPending,
        isSuccess, // Fixed typo from 'isSucess'
        isError,
        isSettled,
        status,
    };
};