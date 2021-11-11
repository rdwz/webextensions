import {useCallback, useState} from "react";

type Callback = () => void;

export function useConfirmation(action: Callback): [Callback, Callback | undefined] {
    const [isArmed, setArmed] = useState(false);
    const arm = useCallback(() => setArmed(true), []);
    const disarm = useCallback(() => setArmed(false), []);

    const trigger = useCallback(() => {
        try {
            action();
        } catch (error) {
            console.error(error);
        } finally {
            setArmed(false);
        }
    }, [action]);

    return isArmed ? [trigger, disarm] : [arm, undefined];
}
