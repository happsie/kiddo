import {useState} from "react";
import {DrawerState} from "@core/components/drawer/Drawer.tsx";

export const useDrawer = (): [DrawerState, () => void] => {
    const [isOpen, setIsOpen] = useState<boolean | undefined>();

    const toggle = () => {
        setIsOpen(isOpen == undefined ? true : !isOpen);
    }

    return [isOpen, toggle];
};