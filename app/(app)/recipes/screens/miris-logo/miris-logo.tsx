import { readFile } from "node:fs/promises";
import path from "node:path";
import { PreSatori } from "@/utils/pre-satori";

// Inline the SVG as a base64 data URL so the headless rasterizer (Takumi)
// doesn't need to resolve a relative URL at render time. SVG is preferable
// to PNG for vector logos — resolution-independent, no scaling artifacts.
async function loadLogoDataUrl(): Promise<string> {
	const filePath = path.join(process.cwd(), "public", "Miris-Logo.svg");
	const buffer = await readFile(filePath);
	return `data:image/svg+xml;base64,${buffer.toString("base64")}`;
}

export default async function MirisLogo({
	width = 800,
	height = 480,
}: {
	width?: number;
	height?: number;
}) {
	const dataUrl = await loadLogoDataUrl();

	return (
		<PreSatori useDoubling={false} width={width} height={height}>
			{/** biome-ignore lint/a11y/useAltText: brand mark */}
			<img
				src={dataUrl}
				width={width}
				height={height}
				style={{ display: "block" }}
			/>
		</PreSatori>
	);
}
