
export function getTranslation(locale: string): EncryptedFolderTranslation {
	let normalized = locale.toLowerCase();
	if (normalized === "pt-br" || normalized === "pt_br") normalized = "pt-BR";
	if (normalized === "es") normalized = "es";
	if (normalized in translations) {
		return translations[normalized as keyof typeof translations];
	}
	return translations["en"];
}

export type EncryptedFolderTranslation = {
	title: string;
	attention: string;
	warningBlock: string;
	configTitle: string;
	configDesc: string;
	fileInfoBlock: string;
	folderPath: string;
	folderPathDesc: string;
	password: string;
	passwordDesc: string;
	passwordPlacHol: string;
	encryptBtn: string;
	decryptBtn: string;
	backupEmail: string;
	backupEmailDesc: string;
	backupBtn: string;
	backupBtnDesc: string;
	backupNotice: string;
	backupNoticeError: string;
	infoBlock: string;
	footer: string;
	pluginLoaded: string;
	encryptMenu: string;
	decryptMenu: string;
	promptEncrypt: string;
	promptDecrypt: string;
	folderOrPasswordMissing: string;
	noMarkdownFound: string;
	encryptSuccess: string;
	emailClientOpened: string;
	decryptSuccess: string;
	decryptError: string;
};

export const translations: Record<string, EncryptedFolderTranslation> = {
	"en": {
		title: "Encryptor Secure Notes",
		attention: "ATTENTION:",
		warningBlock: "Keep your encryption password safe! If you lose your password, it will not be possible to recover your encrypted notes. Never edit the encrypted folder path if you have already encrypted notes, as this may make data recovery impossible. Always backup your password and important notes. You can also send a backup of your password by email. I am not responsible for data loss or problems caused by using this plugin. Use with caution and always backup your data.",
		configTitle: "Settings",
		configDesc: "Set the folder path to encrypt and the encryption password.",
		fileInfoBlock: "Instructions: All notes in .md (Markdown) format inside the specified folder and its subfolders will be encrypted. Files of other formats will not be encrypted.",
		folderPath: "Folder path to encrypt",
		folderPathDesc: "Ex: Encrypted/",
		password: "Encryption password",
		passwordDesc: "⚠️ - The password will NOT be saved, only used temporarily.",
		passwordPlacHol: "Enter the password",
		encryptBtn: "🔒 Encrypt",
		decryptBtn: "🔓 Decrypt",
		backupEmail: "Backup password email (Optional)",
		backupEmailDesc: "Email to receive the password backup.",
		backupBtn: "Send password by email",
		backupBtnDesc: "Sends the password above to the backup email.",
		backupNotice: "Email client opened for backup.",
		backupNoticeError: "Fill in the backup email and password first.",
		infoBlock: "Manual password backup by email (Optional). The plugin uses the mailto: feature of your operating system to open the default email app with recipient, subject, and body filled. The plugin will try to open your default email client for confirmation and sending. Never share your password with others.",
		footer: "Thank you for using Encryptor Secure Notes! Developed by AndreLucyo2. If you want to support development, consider a donation at Ko-fi. If you like this plugin, share it with other Obsidian users.",
		pluginLoaded: "Plugin Encryptor Secure Notes loaded!",
		encryptMenu: "Encrypt folder",
		decryptMenu: "Decrypt folder",
		promptEncrypt: "Enter password to encrypt notes:",
		promptDecrypt: "Enter password to decrypt notes:",
		folderOrPasswordMissing: "Folder path or password missing.",
		noMarkdownFound: "No markdown files found in folder.",
		encryptSuccess: "Encrypted {count} notes!",
		emailClientOpened: "Email client opened for password backup.",
		decryptSuccess: "Decrypted {count} notes!",
		decryptError: "Error decrypting notes. Check your password and try again.",
	},
	"pt-BR": {
		title: "Encryptor Secure Notes",
		attention: "ATENÇÃO:",
		warningBlock: "Guarde sua senha de criptografia em local seguro! Se você perder a senha, não será possível recuperar suas notas criptografadas. Nunca edite o caminho da pasta criptografada se houver notas já criptografadas, pois isso pode tornar impossível a recuperação dos dados. Faça sempre backup da senha e das notas importantes. Você também pode enviar um backup da senha por email. Não me responsabilizo por perda de dados ou problemas causados pelo uso deste plugin. Aproveite com cautela e sempre faça backup dos seus dados.",
		configTitle: "Configurações",
		configDesc: "Configure o caminho da pasta a ser criptografada e a senha de criptografia.",
		fileInfoBlock: "Instruções: Todas as notas no formato .md (Markdown) dentro da pasta informada e suas subpastas serão criptografadas. Arquivos de outros formatos não serão criptografados.",
		folderPath: "Caminho da pasta a criptografar",
		folderPathDesc: "Ex: Encriptadas/",
		password: "Senha de criptografia",
		passwordDesc: "⚠️ - A senha NÃO será salva, apenas usada temporariamente.",
		passwordPlacHol: "Digite a senha",
		encryptBtn: "🔒 Criptografar",
		decryptBtn: "🔓 Descriptografar",
		backupEmail: "Email backup de senha (Opcional)",
		backupEmailDesc: "Email para receber o backup da senha.",
		backupBtn: "Enviar senha por email",
		backupBtnDesc: "Envia a senha digitada acima para o email de backup informado.",
		backupNotice: "Cliente de email aberto para envio do backup.",
		backupNoticeError: "Preencha o email de backup e a senha antes.",
		infoBlock: "Backup manual da senha por email (Opcional). O plugin utiliza o recurso mailto: do seu sistema operacional para abrir o aplicativo de email padrão já com o destinatário, assunto e corpo preenchidos. O plugin tentará abrir seu cliente de email padrão, para confirmação e envio. Nunca compartilhe sua senha com terceiros.",
		footer: "Obrigado por usar o Encryptor Secure Notes! Desenvolvido por AndreLucyo2. Se quiser apoiar o desenvolvimento, considere uma doação no Ko-fi. Se você gosta deste plugin, compartilhe com outros usuários do Obsidian!.",
		pluginLoaded: "Plugin Encrypted Folder carregado!",
		encryptMenu: "Criptografar pasta",
		decryptMenu: "Descriptografar pasta",
		promptEncrypt: "Digite a senha para criptografar as notas:",
		promptDecrypt: "Digite a senha para descriptografar as notas:",
		folderOrPasswordMissing: "Caminho da pasta ou senha não preenchidos.",
		noMarkdownFound: "Nenhum arquivo markdown encontrado na pasta.",
		encryptSuccess: "Criptografadas {count} notas!",
		emailClientOpened: "Cliente de email aberto para backup da senha.",
		decryptSuccess: "Descriptografadas {count} notas!",
		decryptError: "Erro ao descriptografar as notas. Verifique a senha e tente novamente.",
	},
	"es": {
		title: "Encryptor Secure Notes",
		attention: "ATENCIÓN:",
		warningBlock: "¡Guarda tu contraseña de cifrado en un lugar seguro! Si pierdes la contraseña, no será posible recuperar tus notas cifradas. Nunca edites la ruta de la carpeta cifrada si ya tienes notas cifradas, ya que esto puede hacer imposible la recuperación de los datos. Haz siempre copias de seguridad de la contraseña y de las notas importantes. También puedes enviar una copia de seguridad de la contraseña por correo electrónico. No me responsabilizo por la pérdida de datos o problemas causados por el uso de este plugin. Utilízalo con precaución y haz siempre copias de seguridad de tus datos.",
		configTitle: "Configuraciones",
		configDesc: "Configura la ruta de la carpeta a cifrar y la contraseña de cifrado.",
		fileInfoBlock: "Instrucciones: Todas las notas en formato .md (Markdown) dentro de la carpeta indicada y sus subcarpetas serán cifradas. Archivos de otros formatos no serán cifrados.",
		folderPath: "Ruta de la carpeta a cifrar",
		folderPathDesc: "Ej: Encriptadas/",
		password: "Contraseña de cifrado",
		passwordDesc: "⚠️ - La contraseña NO se guardará, solo se usará temporalmente.",
		passwordPlacHol: "Ingresa la contraseña",
		encryptBtn: "🔒 Cifrar",
		decryptBtn: "🔓 Descifrar",
		backupEmail: "Correo de respaldo de contraseña (Opcional)",
		backupEmailDesc: "Correo electrónico para recibir la copia de seguridad de la contraseña.",
		backupBtn: "Enviar contraseña por correo",
		backupBtnDesc: "Envía la contraseña escrita arriba al correo de respaldo.",
		backupNotice: "Cliente de correo abierto para el respaldo.",
		backupNoticeError: "Completa el correo de respaldo y la contraseña primero.",
		infoBlock: "Respaldo manual de la contraseña por correo (Opcional). El plugin utiliza la función mailto: de tu sistema operativo para abrir la aplicación de correo predeterminada con destinatario, asunto y cuerpo rellenados. El plugin intentará abrir tu cliente de correo predeterminado para confirmación y envío. Nunca compartas tu contraseña con otros.",
		footer: "¡Gracias por usar Encryptor Secure Notes! Desarrollado por AndreLucyo2. Si quieres apoyar el desarrollo, considera una donación en Ko-fi. Si te gusta este plugin, compártelo con otros usuarios de Obsidian!.",
		pluginLoaded: "¡Plugin Encrypted Folder cargado!",
		encryptMenu: "Cifrar carpeta",
		decryptMenu: "Descifrar carpeta",
		promptEncrypt: "Ingresa la contraseña para cifrar las notas:",
		promptDecrypt: "Ingresa la contraseña para descifrar las notas:",
		folderOrPasswordMissing: "Ruta de la carpeta o contraseña faltante.",
		noMarkdownFound: "No se encontraron archivos markdown en la carpeta.",
		encryptSuccess: "¡Cifradas {count} notas!",
		emailClientOpened: "Cliente de correo abierto para respaldo de contraseña.",
		decryptSuccess: "¡Descifradas {count} notas!",
		decryptError: "Error al descifrar las notas. Verifica la contraseña e inténtalo de nuevo.",
	}
};
