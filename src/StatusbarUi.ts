import { StatusBarAlignment, StatusBarItem, window } from "vscode";

export class StatusbarUi {
    private _statusbarItem: StatusBarItem;

    constructor() {
        this._statusbarItem = window.createStatusBarItem(StatusBarAlignment.Right, 10);
        this._statusbarItem.backgroundColor = "#AAAAAA";
    }

    public showStopButton() {
        this._statusbarItem.text = "$(clock) Stop timer!";
        this._statusbarItem.command = "pomodoro.stop";
        this._statusbarItem.color = "#FF5733";
        this._statusbarItem.show();
    }

    public showStartButton() {
        this._statusbarItem.text = "$(clock) Start timer!";
        this._statusbarItem.command = "pomodoro.start";
        this._statusbarItem.color = "#4CAF50";
        this._statusbarItem.show();
    }

    public showDuration(type: "longBreak" | "shortBreak" | "working", timeLeftInMs: number, session: number, maxIterations?: number, currentIteration?: number) {
        switch (type) {
            case "working":
                window.setStatusBarMessage(`Session ${session}: Working (${currentIteration}/${maxIterations}): ${this._formatTimestamp(timeLeftInMs)}`);
                break;
            case "longBreak":
                window.setStatusBarMessage(`Session ${session}: Long break: ${this._formatTimestamp(timeLeftInMs)}`);
                break;
            case "shortBreak":
                window.setStatusBarMessage(`Session ${session}: Short break: ${this._formatTimestamp(timeLeftInMs)}`);
                break;
            default:
                break;
        }
    }

    private _formatTimestamp(timestamp: number): string {
        if (timestamp < 0) {
            return "00:00";
        }
        const minutes = Math.floor(timestamp / 1000 / 60);
        const seconds = Math.floor((timestamp / 1000) % 60);

        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');

        return `${formattedMinutes}:${formattedSeconds}`;
    }
}