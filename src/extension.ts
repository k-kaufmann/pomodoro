// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Pomodoro } from './Pomodoro';


const pomodoro = new Pomodoro();

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let start = vscode.commands.registerCommand('pomodoro.start', () => {
		pomodoro.startTimer();
	});

	let stop = vscode.commands.registerCommand('pomodoro.stop', () => {
		pomodoro.stopTimer();
	});


	context.subscriptions.push(start);
	context.subscriptions.push(stop);
}

// This method is called when your extension is deactivated
export function deactivate() { }
