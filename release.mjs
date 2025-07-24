import { execSync } from 'child_process';
import fs from 'fs';

const version = process.argv[2];

if (!version) {
	console.error('❌ Versão não especificada. Use: npm run buildRelease -- v1.0.0');
	process.exit(1);
}

const filesToUpload = ['main.js', 'manifest.json'];

// Verifica se os arquivos existem
for (const file of filesToUpload) {
	if (!fs.existsSync(file)) {
		console.error(`❌ Arquivo não encontrado: ${file}`);
		process.exit(1);
	}
}

try {
	console.log('🚀 Gerando build...');
	execSync('npm run build', { stdio: 'inherit' });

	console.log(`🏷️ Criando tag ${version}...`);
	execSync(`git tag ${version}`);
	execSync(`git push origin ${version}`);

	console.log('📦 Criando release no GitHub com os arquivos compilados...');
	execSync(`gh release create ${version} ${filesToUpload.join(' ')} --title "${version}" --notes "Release automática com artefatos compilados."`);

	console.log('✅ Release criada com sucesso!');
} catch (error) {
	console.error('❌ Erro ao criar a release:', error.message);
	process.exit(1);
}
