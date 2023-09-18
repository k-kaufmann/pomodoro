import { WorkspaceConfiguration } from "vscode";
import * as vscode from "vscode";

export class Configuration {
    private _configuration: WorkspaceConfiguration;

    constructor() {
        this._configuration = vscode.workspace.getConfiguration('pomodoro');
    }

    private _getSetting<T>(settingKey: string): T {
        return this._configuration.get(settingKey) as T;
    }

    public loadConfiguration() {
        this._configuration = vscode.workspace.getConfiguration('pomodoro');
    }

    public getWorkingPeriodDuration(): number {
        return this._getSetting<number>("workingPeriodDuration");
    }

    public getShortPausePeriodDuration(): number {
        return this._getSetting<number>("shortPausePeriodDuration");
    }

    public getLongPausePeriodDuration(): number {
        return this._getSetting<number>("longPausePeriodDuration");
    }

    public getIterations(): number {
        return this._getSetting<number>("iterations");
    }

    public getFinishedWorkingPeriodText(): string {
        return this._getSetting<string>("finishedWorkingPeriod");
    }

    public getFinishedShortBreakText(): string {
        return this._getSetting<string>("finishedShortPause");
    }

    public getFinishedLongBreakText(): string {
        return this._getSetting<string>("finishedLongBreak");
    }

    public getFinishedSessionText(): string {
        return this._getSetting<string>("finishedSession");
    }
}