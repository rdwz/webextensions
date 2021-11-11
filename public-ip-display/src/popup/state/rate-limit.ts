import {useCallback, useEffect, useState} from "react";

type Callback = () => void;

export function useRateLimiting(action: Callback, cooldown: number): [number | null, Callback | undefined] {
    const [counter, setCounter] = useState(0);
    const [tickedAt, setTickedAt] = useState<Date | null>(null);

    const tick = useCallback(() => {
        setCounter(cd => cd - 1);
        setTickedAt(new Date());
    }, [setCounter, setTickedAt]);

    const triggered = counter > 0;

    useEffect(() => {
        if (triggered && tickedAt != null) {
            const oneSecondAfterLastTick = tickedAt.getTime() + 1000 - Date.now();
            const timer = setTimeout(tick, oneSecondAfterLastTick);
            return () => clearTimeout(timer);
        }
    }, [triggered, tickedAt, tick]);

    const trigger = useCallback(() => {
        setCounter(cooldown);
        setTickedAt(new Date());

        try {
            action();
        } catch (error) {
            console.error(error);
        }
    }, [setCounter, cooldown, setTickedAt, action]);

    return triggered ? [counter, undefined] : [null, trigger];
}
