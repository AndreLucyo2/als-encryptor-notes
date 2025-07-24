import { App, Modal, Setting } from "obsidian";

export class PromptModal extends Modal {
	private promptText: string;
	private callback: (result: string | null) => void;

	constructor(app: App, promptText: string, callback: (result: string | null) => void) {
		super(app);
		this.promptText = promptText;
		this.callback = callback;
	}

	onOpen() {
		let value = "";

		new Setting(this.contentEl)
			.setName(this.promptText)
			.addText((text) =>
				text
					.setPlaceholder("Password...")
					.setValue("")
					.onChange((val) => (value = val))
					.inputEl.setAttribute("type", "password")
			);

		new Setting(this.contentEl)
			.addButton((btn) =>
				btn
					.setButtonText("OK")
					.setCta()
					.onClick(() => {
						this.callback(value);
						this.close();
					})
			);
	}

	onClose() {
		this.contentEl.empty();
	}
}
