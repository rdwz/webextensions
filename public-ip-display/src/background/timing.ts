import {triggerable} from "../common/triggerable";
import browser from "webextension-polyfill";

const REFRESH_IP = "refresh";

export function setTimer(timeout: number): void {
    browser.alarms.create(REFRESH_IP, {
        delayInMinutes: timeout
    });
}

const {hide: timerEvent, expose: timerPassed} = triggerable();
export {timerPassed};

export function armTimer(): void {
    browser.alarms.onAlarm.addListener(alarm => {
        if (alarm.name === REFRESH_IP) {
            timerEvent.trigger(undefined);
        } else {
            throw new Error(`unknown alarm ${JSON.stringify(alarm)}`);
        }
    });
}
