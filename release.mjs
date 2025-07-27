import { execSync } from 'child_process';
import fs from 'fs';

const version = process.argv[2];

if (!version) {
	console.error('❌ Versão não especificada. Use: npm run buildRelease -- 1.0.0');
	process.exit(1);
}

const filesToUpload = ['main.js', 'manifest.json', 'style.css'];

// Verifica se os arquivos existem na pasta dist
for (const file of filesToUpload) {
	const filePath = `dist/${file}`;
	if (!fs.existsSync(filePath)) {
		console.error(`❌ Arquivo não encontrado: ${filePath}`);
		process.exit(1);
	}
}

try {
	console.log('🚀 Gerando build...');
	execSync('npm run build', { stdio: 'inherit' });

	console.log(`🏷️ Criando tag ${version}...`);
	execSync(`git tag ${version}`);
	execSync(`git push origin ${version}`);

	// Monta os caminhos completos dos arquivos para upload
	const filesWithPath = filesToUpload.map(f => `dist/${f}`).join(' ');

	console.log('📦 Criando release no GitHub com os arquivos compilados...');
	execSync(`gh release create ${version} ${filesWithPath} --title "${version}" --notes "Release automática com artefatos compilados."`);

	console.log('✅ Release criada com sucesso!');
} catch (error) {
	console.error('❌ Erro ao criar a release:', error.message);
	process.exit(1);
}
