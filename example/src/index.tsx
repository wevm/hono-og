import { Hono } from "hono";
import { ImageResponse } from "hono-og";

const app = new Hono();

app.get("/", () => {
	return new ImageResponse(
		<div
			style={{
				backgroundColor: "black",
				backgroundSize: "150px 150px",
				height: "100%",
				width: "100%",
				display: "flex",
				textAlign: "center",
				alignItems: "center",
				justifyContent: "center",
				flexDirection: "column",
				flexWrap: "nowrap",
			}}
		>
			<div
				style={{
					fontSize: 60,
					fontStyle: "normal",
					letterSpacing: "-0.025em",
					color: "white",
					marginTop: 30,
					padding: "0 120px",
					lineHeight: 1.4,
					whiteSpace: "pre-wrap",
				}}
			>
				hello hono
			</div>
		</div>,
	);
});

export default app;
