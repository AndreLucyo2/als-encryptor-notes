import { App, PluginSettingTab, Setting, Notice } from "obsidian";
import EncryptedFolderPlugin from "./main";
import { sendPasswordByMailto } from "./send-email";
import { getTranslation } from "./translations";

import type { EncryptedFolderTranslation } from "./translations";
export type SupportedLang = "en" | "pt-br" | "pt-BR" | "es";
export type TranslationObject = EncryptedFolderTranslation;

export class EncryptedFolderSettingTab extends PluginSettingTab {
	plugin: EncryptedFolderPlugin;

	constructor(app: App, plugin: EncryptedFolderPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		// Detecta idioma do Obsidian usando vault.getConfig('locale') se disponível
		let obsidianLocale = "en";
		const vaultAny = this.app.vault as unknown as { getConfig?: (key: string) => string };
		if (typeof vaultAny.getConfig === "function") {
			obsidianLocale = vaultAny.getConfig("locale") || "en";
		}
		const translation: TranslationObject = getTranslation(obsidianLocale);

		containerEl.createEl("h1", { text: translation.title });

		// Bloco de alerta para o usuário (usando classes CSS e API DOM)
		const warningBlock = containerEl.createDiv({ cls: "warning-block" });
		const warningTitle = warningBlock.createSpan({ cls: "warning-block-title" });
		warningTitle.setText(translation.attention);
		warningBlock.createEl("br");
		const warningText = warningBlock.createSpan({ cls: "warning-block-text" });
		warningText.setText(translation.warningBlock);

		containerEl.createEl("h1", { text: translation.configTitle });
		containerEl.createEl("p", { text: translation.configDesc });

		// Bloco de instruções sobre criptografia de arquivos (com formatação)
		const fileInfoBlock = containerEl.createDiv({ cls: "file-info-block" });
		// Exemplo para português, ajuste para outros idiomas se necessário
		if (translation.fileInfoBlock.includes("<b>")) {
			const strong = fileInfoBlock.createEl("b");
			strong.setText("Instruções:");
			fileInfoBlock.createEl("br");
			fileInfoBlock.appendText("Todas as notas no formato .md (Markdown) dentro da pasta informada e suas subpastas serão criptografadas.");
			fileInfoBlock.createEl("br");
			const warn = fileInfoBlock.createSpan();
			warn.addClass("warning-block-text");
			warn.setText("Arquivos de outros formatos não serão criptografados.");
		} else {
			fileInfoBlock.setText(translation.fileInfoBlock.replace(/<[^>]+>/g, ""));
		}

		new Setting(containerEl)
			.setName(translation.folderPath)
			.setDesc(translation.folderPathDesc)
			.addText(text =>
				text
					.setPlaceholder(translation.folderPathDesc)
					.setValue(this.plugin.settings.folderPath)
					.onChange(async (value) => {
						this.plugin.settings.folderPath = value.trim();
						await this.plugin.saveSettings();
					})
			);

		let password = "";

		new Setting(containerEl)
			.setName(translation.password)
			.setDesc(translation.passwordDesc)
			.addText(text =>
				text
					.setPlaceholder(translation.passwordPlacHol)
					.onChange((value) => {
						password = value.trim();
					})
			);

		new Setting(containerEl)
			.addButton(btn => btn
				.setButtonText(translation.encryptBtn)
				.setCta()
				.onClick(async () => {
					await this.plugin.encryptFolder(password);
				})
			);

		new Setting(containerEl)
			.addButton(btn => btn
				.setButtonText(translation.decryptBtn)
				.onClick(async () => {
					await this.plugin.decryptFolder(password);
				})
			);

		const lineBlock = containerEl.createEl("hr");
		lineBlock.style.marginBottom = "1em";

		// Info block (com formatação)
		const infoBlock = containerEl.createDiv({ cls: "file-info-block" });
		infoBlock.style.marginBottom = "1em";
		if (translation.infoBlock.includes("<h2>")) {
			// Exemplo: <h2>Backup manual da senha por email (Opcional)</h2>O plugin utiliza ...<span style='color: #e09000'>Nunca compartilhe sua senha com terceiros.</span>
			infoBlock.createEl("h2", { text: "Backup manual da senha por email (Opcional)" });
			infoBlock.appendText("O plugin utiliza o recurso mailto: do seu sistema operacional para abrir o aplicativo de email padrão já com o destinatário, assunto e corpo preenchidos. O plugin tentará abrir seu cliente de email padrão, para confirmação e envio.");
			infoBlock.createEl("br");
			const warn = infoBlock.createSpan({ cls: "info-warning-text" });
			warn.setText("Nunca compartilhe sua senha com terceiros.");
		} else {
			infoBlock.setText(translation.infoBlock.replace(/<[^>]+>/g, ""));
		}

		new Setting(containerEl)
			.setName(translation.backupEmail)
			.setDesc(translation.backupEmailDesc)
			.addText(text => text
				.setPlaceholder(translation.backupEmailDesc)
				.setValue(this.plugin.settings.backupEmail)
				.onChange(async (value) => {
					this.plugin.settings.backupEmail = value;
					await this.plugin.saveSettings();
				})
			);

		new Setting(containerEl)
			.setName(translation.backupBtn)
			.setDesc(translation.backupBtnDesc)
			.addButton(button => button
				.setButtonText(translation.backupBtn)
				.setCta()
				.onClick(() => {
					const email = this.plugin.settings.backupEmail;
					if (email && password) {
						sendPasswordByMailto(email, password);
						new Notice(translation.backupNotice);
					} else {
						new Notice(translation.backupNoticeError);
					}
				})
			);

		// Footer block (com formatação)
		const footerBlock = containerEl.createDiv({ cls: "footer-block" });
		footerBlock.setText(translation.footer.replace(/<[^>]+>/g, ""));
	}
}
