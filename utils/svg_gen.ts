function convertSecondsToTime(seconds: number) {
	const totalSeconds = Math.floor(seconds);

	const hours = Math.floor(totalSeconds / 3600);

	const minutes = Math.floor((totalSeconds % 3600) / 60);

	return `${hours} hrs and ${minutes} mins`;
}

export function generateSVG({
	data,
	background_color,
	header_color,
	value_color,
	border_color,
}: {
	data: Map<String, String | number>;
	background_color: string | undefined | string[];
	header_color: string | undefined | string[];
	value_color: string | undefined | string[];
	border_color: string | undefined | string[];
}): string {
	const width: string = '400';

	const spacingY: number = 25;
	const padding: number = 20;
	let initialY: number = 25;
	const textBlocks: number = 4;

	const dynamicHeight = initialY + textBlocks * spacingY + padding;

	return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${dynamicHeight}" viewBox="0 0 ${width} ${dynamicHeight}" fill="none" role="img">
        <title id="titleId">WakaTime Code Stats</title>
        <style>
        @supports(-moz-appearance: auto) {
        .stat {
        font: 600 14px 'Segoe UI', Ubuntu, "Helvetica Neue", Sans-Serif;
        }
        .header {
        fill: #${header_color ?? '000000'};
        }
        .value {
        fill: #${value_color ?? '000000'};
        }
        @supports(-moz-appearance: auto) {
        .stat { font-size:12px; }
        }
        .stagger {
        opacity: 0;
        animation: fadeInAnimation 0.3s ease-in-out forwards;
        }
        .bold { font-weight: 700 }
        /* Animations */
        @keyframes fadeInAnimation {
        from {
        opacity: 0;
        }
        to {
        opacity: 1;
        }
        }
        </style>
        <rect x="0.5" y="0.5" rx="4.5" height="99%" stroke="#${
					border_color ?? 'e4e2e2'
				}" width="${(
		parseInt(width) - 1
	).toString()}" fill="#${background_color}" stroke-opacity="1"/>
        <g transform="translate(25, 35)">

        </g>
        <g>
        <svg x="0" y="0">
            <g transform="translate(0, ${initialY})">
                <g class="stagger" style="animation-delay: 600ms" transform="translate(25, 0)">
                    <text class="stat bold header" y="12.5">I coded for a total of</text>
                    <text class="stat bold value" x="199.01" y="12.5">${data.get(
											'total_time'
										)}</text>
                </g>
            </g>
            <g transform="translate(0, ${(initialY += spacingY)})">
                <g class="stagger" style="animation-delay: 750ms" transform="translate(25, 0)">
                    <text class="stat bold header" y="12.5">My daily average is</text>
                    <text class="stat bold value" x="199.01" y="12.5">${data.get(
											'daily_average'
										)}</text>
                </g>
            </g>
            <g transform="translate(0, ${(initialY += spacingY)})">
                <g class="stagger" style="animation-delay: 600ms" transform="translate(25, 0)">
                    <text class="stat bold header" y="12.5">My most used language is</text>
                    <text class="stat bold value" x="199.01" y="12.5">${data.get(
											'most_used_language'
										)}</text>
                </g>
            </g>
            <g transform="translate(0, ${(initialY += spacingY)})">
                <g class="stagger" style="animation-delay: 600ms" transform="translate(25, 0)">
                    <text class="stat bold header" y="12.5">I used ${data.get(
											'most_used_language'
										)} for</text>
                    <text class="stat bold value" x="199.01" y="12.5">${convertSecondsToTime(
											data.get('most_used_language_time') as number
										)}</text>
                </g>
            </g>
        </svg>
        </g>
    </svg>`;
}
