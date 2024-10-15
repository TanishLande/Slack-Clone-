import { atom, useAtom } from "jotai";

const modalState =  atom(false);

export const useCreateWorkSpaceModal = () =>{
    return useAtom(modalState);
}
