import { StatusBarAlignment, window, workspace } from "vscode";
import { Configuration } from "./Configuration";
import { StatusbarUi } from "./StatusbarUi";

export class Pomodoro {
    private _configuration: Configuration;
    private _timer?: NodeJS.Timeout;
    private _currentIteration: number;
    private _type: "longBreak" | "shortBreak" | "working";
    private _statusbarUi: StatusbarUi;
    private _session: number;

    constructor() {
        this._configuration = new Configuration();
        this._currentIteration = 0;
        this._type = "working";
        this._statusbarUi = new StatusbarUi();
        this._statusbarUi.showStartButton();
        this._session = 1;
    }

    public startTimer(durationInMinutes: number = this._configuration.getWorkingPeriodDuration()) {
        this._session = 1;
        this._configuration.loadConfiguration();
        console.log("Start");
        if (this._timer !== null) {
            clearTimeout(this._timer);
        }
        this._startWorkingPhase();
        this._statusbarUi.showStopButton();
    }

    public stopTimer() {
        console.log("Stop!");
        if (this._timer !== null) {
            clearTimeout(this._timer);
        }
        this._statusbarUi.showStartButton();
        this._currentIteration = 0;
    }

    private _checkTimer(finish: () => void, endTime: number) {
        this._statusbarUi.showDuration(this._type, endTime - Date.now(), this._session, this._configuration.getIterations(), this._currentIteration);
        this._timer = setTimeout(() => {
            if (endTime < Date.now()) {
                finish();
                return;
            }
            this._checkTimer(finish, endTime);
        }, 500);
    }

    private _startWorkingPhase() {
        this._type = "working";
        this._currentIteration = this._currentIteration + 1;
        console.log(workspace.getConfiguration('pomodoro').get("workingPeriodDuration"));
        this._checkTimer(() => {
            if (this._currentIteration < 4) {
                window.showInformationMessage(this._configuration.getFinishedWorkingPeriodText());
                this._startShortPause();
                return;
            }
            window.showInformationMessage(this._configuration.getFinishedSessionText());
            this._startLongPause();
        }, Date.now() + (this._configuration.getWorkingPeriodDuration() * 60 * 1000));
    }

    private _startShortPause() {
        this._type = "shortBreak";
        this._checkTimer(() => {
            window.showInformationMessage(this._configuration.getFinishedShortBreakText());
            this._startWorkingPhase();
        }, Date.now() + (this._configuration.getShortPausePeriodDuration() * 60 * 1000));
    }

    private _startLongPause() {
        this._type = "longBreak";
        this._currentIteration = 0;
        this._checkTimer(() => {
            window.showInformationMessage(this._configuration.getFinishedLongBreakText());
            this._session = this._session + 1;
            this._startWorkingPhase();
        }, Date.now() + (this._configuration.getLongPausePeriodDuration() * 60 * 1000));
    }
}