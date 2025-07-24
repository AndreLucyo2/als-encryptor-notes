
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
		warningBlock: `<b>Keep your encryption password safe!</b><br>If you lose your password, <u>it will not be possible to recover your encrypted notes</u>.<br><b>Never edit the encrypted folder path if you have already encrypted notes</b>, as this may make data recovery impossible.<br>Always backup your password and important notes.<br>You can also send a backup of your password by email.<br>I am not responsible for data loss or problems caused by using this plugin.<br>Use with caution and always backup your data.<br>`,
		configTitle: "Settings",
		configDesc: "Set the folder path to encrypt and the encryption password.",
		fileInfoBlock: `<b>Instructions:</b><br>All notes in <b>.md</b> (Markdown) format inside the specified folder <u>and its subfolders</u> will be encrypted.<br><span style='color:#c00000;'>Files of other formats <b>will not</b> be encrypted.</span>`,
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
		infoBlock: `<h2>Manual password backup by email (Optional)</h2>The plugin uses the <strong>mailto:</strong> feature of your operating system to open the default email app with recipient, subject, and body filled.<br>The plugin will try to open your default email client for confirmation and sending.<br><span style='color: #e09000'>Never share your password with others.</span>`,
		footer: `<div style='margin-bottom:0.5em;'>Thank you for using <b>Encryptor Secure Notes</b>!<br>Developed by <a href='https://github.com/AndreLucyo2' target='_blank' style='color:#90cdf4;'>AndreLucyo2</a></div><div style='margin-bottom:0.5em;'>If you want to support development, consider a donation:<br><a href='https://ko-fi.com/andrelucyo' target='_blank'><img src='https://cdn.ko-fi.com/cdn/kofi2.png?v=3' alt='Ko-fi' style='height:32px;vertical-align:middle;margin-right:8px;'></a></div><div style='font-size:0.9em;color:#bbb;'><i>If you like this plugin, share it with other Obsidian users!</i></div>`
		, pluginLoaded: "Plugin Encryptor Secure Notes loaded!",
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
		warningBlock: `<b>Guarde sua senha de criptografia em local seguro!</b><br>Se você perder a senha, <u>não será possível recuperar suas notas criptografadas</u>.<br><b>Nunca edite o caminho da pasta criptografada se houver notas já criptografadas</b>, pois isso pode tornar impossível a recuperação dos dados.<br>Faça sempre backup da senha e das notas importantes.<br>Você também pode enviar um backup da senha por email.<br>Não me responsabilizo por perda de dados ou problemas causados pelo uso deste plugin.<br>Aproveite com cautela e sempre faça backup dos seus dados.<br>`,
		configTitle: "Configurações",
		configDesc: "Configure o caminho da pasta a ser criptografada e a senha de criptografia.",
		fileInfoBlock: `<b>Instruções:</b><br>Todas as notas no formato <b>.md</b> (Markdown) dentro da pasta informada <u>e suas subpastas</u> serão criptografadas.<br><span style='color:#c00000;'>Arquivos de outros formatos <b>não</b> serão criptografados.</span>`,
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
		infoBlock: `<h2>Backup manual da senha por email (Opcional)</h2>O plugin utiliza o recurso <strong>mailto:</strong> do seu sistema operacional para abrir o aplicativo de email padrão já com o destinatário, assunto e corpo preenchidos.<br>O plugin tentará abrir seu cliente de email padrão, para confirmação e envio.<br><span style='color: #e09000'>Nunca compartilhe sua senha com terceiros.</span>`,
		footer: `<div style='margin-bottom:0.5em;'>Obrigado por usar o <b>Encryptor Secure Notes</b>!<br>Desenvolvido por <a href='https://github.com/AndreLucyo2' target='_blank' style='color:#90cdf4;'>AndreLucyo2</a></div><div style='margin-bottom:0.5em;'>Se quiser apoiar o desenvolvimento, considere uma doação:<br><a href='https://ko-fi.com/andrelucyo' target='_blank'><img src='https://cdn.ko-fi.com/cdn/kofi2.png?v=3' alt='Ko-fi' style='height:32px;vertical-align:middle;margin-right:8px;'></a></div><div style='font-size:0.9em;color:#bbb;'><i>Se você gosta deste plugin, compartilhe com outros usuários do Obsidian!</i></div>`
		, pluginLoaded: "Plugin Encrypted Folder carregado!",
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
		warningBlock: `<b>¡Guarda tu contraseña de cifrado en un lugar seguro!</b><br>Si pierdes la contraseña, <u>no será posible recuperar tus notas cifradas</u>.<br><b>Nunca edites la ruta de la carpeta cifrada si ya tienes notas cifradas</b>, ya que esto puede hacer imposible la recuperación de los datos.<br>Haz siempre copias de seguridad de la contraseña y de las notas importantes.<br>También puedes enviar una copia de seguridad de la contraseña por correo electrónico.<br>No me responsabilizo por la pérdida de datos o problemas causados por el uso de este plugin.<br>Utilízalo con precaución y haz siempre copias de seguridad de tus datos.<br>`,
		configTitle: "Configuraciones",
		configDesc: "Configura la ruta de la carpeta a cifrar y la contraseña de cifrado.",
		fileInfoBlock: `<b>Instrucciones:</b><br>Todas las notas en formato <b>.md</b> (Markdown) dentro de la carpeta indicada <u>y sus subcarpetas</u> serán cifradas.<br><span style='color:#c00000;'>Archivos de otros formatos <b>no</b> serán cifrados.</span>`,
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
		infoBlock: `<h2>Respaldo manual de la contraseña por correo (Opcional)</h2>El plugin utiliza la función <strong>mailto:</strong> de tu sistema operativo para abrir la aplicación de correo predeterminada con destinatario, asunto y cuerpo rellenados.<br>El plugin intentará abrir tu cliente de correo predeterminado para confirmación y envío.<br><span style='color: #e09000'>Nunca compartas tu contraseña con otros.</span>`,
		footer: `<div style='margin-bottom:0.5em;'>¡Gracias por usar <b>Encryptor Secure Notes</b>!<br>Desarrollado por <a href='https://github.com/AndreLucyo2' target='_blank' style='color:#90cdf4;'>AndreLucyo2</a></div><div style='margin-bottom:0.5em;'>Si quieres apoyar el desarrollo, considera una donación:<br><a href='https://ko-fi.com/andrelucyo' target='_blank'><img src='https://cdn.ko-fi.com/cdn/kofi2.png?v=3' alt='Ko-fi' style='height:32px;vertical-align:middle;margin-right:8px;'></a></div><div style='font-size:0.9em;color:#bbb;'><i>Si te gusta este plugin, ¡compártelo con otros usuarios de Obsidian!</i></div>`
		, pluginLoaded: "¡Plugin Encrypted Folder cargado!",
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
