import { readFile } from "node:fs/promises";
import path from "node:path";
import { PreSatori } from "@/utils/pre-satori";

// Inline the PNG as a base64 data URL so the headless rasterizer (Takumi)
// doesn't need to resolve a relative URL at render time.
async function loadImageDataUrl(): Promise<string> {
	const filePath = path.join(process.cwd(), "public", "space-probe.png");
	const buffer = await readFile(filePath);
	return `data:image/png;base64,${buffer.toString("base64")}`;
}

export default async function SpaceProbe({
	width = 800,
	height = 480,
}: {
	width?: number;
	height?: number;
}) {
	const dataUrl = await loadImageDataUrl();

	return (
		<PreSatori useDoubling={false} width={width} height={height}>
			{/** biome-ignore lint/a11y/useAltText: pre-rendered 1-bit art */}
			<img
				src={dataUrl}
				width={width}
				height={height}
				style={{ display: "block" }}
			/>
		</PreSatori>
	);
}
