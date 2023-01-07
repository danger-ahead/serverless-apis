export function generateSVG(data: Map<String, String>) {
	const width: string = '350';
	const height: string = '150';

	return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" role="img">
        <title id="titleId">WakaTime Code Stats</title>
        <style>
        .header {
        font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif;
        fill: #2f80ed;
        animation: fadeInAnimation 0.8s ease-in-out forwards;
        }
        @supports(-moz-appearance: auto) {
        /* Selector detects Firefox */
        .header { font-size: 15.5px; }
        }
        .stat {
        font: 600 14px 'Segoe UI', Ubuntu, "Helvetica Neue", Sans-Serif; fill: #434d58;
        }
        @supports(-moz-appearance: auto) {
        /* Selector detects Firefox */
        .stat { font-size:12px; }
        }
        .stagger {
        opacity: 0;
        animation: fadeInAnimation 0.3s ease-in-out forwards;
        }
        .not_bold { font-weight: 400 }
        .bold { font-weight: 700 }
        .icon {
        fill: #4c71f2;
        display: none;
        }
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
        <rect data-testid="card-bg" x="0.5" y="0.5" rx="4.5" height="99%" stroke="#e4e2e2" width="${(
					parseInt(width) - 1
				).toString()}" fill="#fffefe" stroke-opacity="1"/>
        <g data-testid="card-title" transform="translate(25, 35)">
        <g transform="translate(0, 0)">
            <text x="0" y="0" class="header" data-testid="header">Since ${data.get(
							'start_date'
						)}:</text>
        </g>
        </g>
        <g data-testid="main-card-body" transform="translate(0, 55)">
        <svg x="0" y="0">
            <g transform="translate(0, 0)">
                <g class="stagger" style="animation-delay: 450ms" transform="translate(25, 0)">
                    <text class="stat  bold" y="12.5">One day, I coded for:</text>
                    <text class="stat  bold" x="199.01" y="12.5">${data.get(
											'best_day'
										)}</text>
                </g>
            </g>
            <g transform="translate(0, 25)">
                <g class="stagger" style="animation-delay: 600ms" transform="translate(25, 0)">
                    <text class="stat  bold" y="12.5">I coded for a total of:</text>
                    <text class="stat  bold" x="199.01" y="12.5">${data.get(
											'total_time'
										)}</text>
                </g>
            </g>
            <g transform="translate(0, 50)">
                <g class="stagger" style="animation-delay: 750ms" transform="translate(25, 0)">
                    <text class="stat  bold" y="12.5">My daily average is:</text>
                    <text class="stat  bold" x="199.01" y="12.5">${data.get(
											'daily_average'
										)}</text>
                </g>
            </g>
        </svg>
        </g>
    </svg>`;
}
