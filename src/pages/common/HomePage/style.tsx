import styled from 'styled-components';

export const HomePageStyled = styled.div`
	position: relative;
	overflow: hidden;
	cursor: none;

	.flashlight {
		position: absolute;
		top: 0;
		left: 0;
		will-change: top, left, transform;
		z-index: 1;
		transform: translate(var(--transformX, 0), var(--transformY, 0));

		width: 240px;
		height: 240px;
		margin-top: -120px;
		margin-left: -120px;
		border: 3px solid #ffff00;
		border-radius: 50%;
		background: #ffff11;
		box-shadow: 0 0 50px 20px #ffa500;
		filter: blur(5px);
	}

	.grid {
		width: 100%;
		height: 100%;

		position: absolute;
		z-index: 2;
		opacity: 0.5;
		backdrop-filter: blur(20px);

		display: grid;
		grid-template-rows: repeat(20, 1fr);
		grid-template-columns: repeat(20, 1fr);
		border: 4px solid #000;

		[class^='box'] {
			border: 4px solid #000;
		}

		.box-1 {
			background-color: #f2a20c;
			grid-row: 2 / 4;
			grid-column: 1/ 21;
		}

		.box-2 {
			background-color: #f22987;
			grid-row: 4 / 12;
			grid-column: 3 / 11;
		}

		.box-3 {
			background-color: #2168a6;
			grid-row: 12 / 21;
			grid-column: 6 / 9;
		}

		.box-4 {
			background-color: #118c3c;
			grid-row: 1 / 1;
			grid-column: 1 / 14;
		}

		.box-5 {
			grid-row: 4 / 8;
			grid-column: 1 / 2;
		}

		.box-6 {
			grid-row: 12 / 21;
			grid-column: 1 / 6;
		}

		.box-7 {
			grid-row: 8 / 12;
			grid-column: 1 / 3;
		}

		.box-8 {
			background-color: #80d2f2;
			grid-row: 4 / 8;
			grid-column: 2 / 3;
		}

		.box-9 {
			background-color: #ff7c47;
			grid-row: 1 / 1;
			grid-column: 14 / 21;
		}

		.box-10 {
			background-color: #ffe560;
			grid-row: 4 / 11;
			grid-column: 14 / 17;
		}

		.box-11 {
			background-color: #d9abff;
			grid-row: 11 / 17;
			grid-column: 11 / 18;
		}

		.box-12 {
			background-color: #eaf205;
			grid-row: 18 / 21;
			grid-column: 9 / 16;
		}

		.box-13 {
			background-color: #ffa6b5;
			grid-row: 12 / 17;
			grid-column: 9 / 11;
		}

		.box-14 {
			background-color: #fcdec0;
			grid-row: 17 / 18;
			grid-column: 9 / 21;
		}

		.box-15 {
			background-color: #97feaf;
			grid-row: 11 / 15;
			grid-column: 18 / 21;
		}

		.box-16 {
			background-color: #fb796b;
			grid-row: 4 / 11;
			grid-column: 11 / 13;
		}

		.box-17 {
			background-color: #f25050;
			grid-row: 4 / 11;
			grid-column: 13 / 14;
		}

		.box-18 {
			background-color: #addc4e;
			grid-row: 15 / 17;
			grid-column: 18 / 21;
		}

		.box-19 {
			background-color: #f22987;
			grid-row: 5 / 7;
			grid-column: 17 / 21;
		}

		.box-20 {
			background-color: #04d9d9;
			grid-row: 4 / 5;
			grid-column: 17 / 21;
		}

		.box-21 {
			background-color: #c482c1;
			grid-row: 7 / 11;
			grid-column: 17 / 21;
		}

		.box-22 {
			background-color: #59dcb2;
			grid-row: 20 / 21;
			grid-column: 16 / 21;
		}

		.box-23 {
			background-color: #3f649d;
			grid-row: 18 / 20;
			grid-column: 16 / 21;
		}
	}

	.title {
		position: absolute;
		top: calc(12.5%);
		left: 24px;
		transform: translateY(-100%);

		color: #000;
		font-size: 26px;
		font-weight: 700;
		user-select: none;

		code {
			padding: 2px 6px;
			border-radius: 6px;
			background: rgba(110, 118, 129, 0.4);

			color: #00087c;
			font-size: 24px;
			font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas,
				Liberation Mono, monospace;
		}

		@media screen and (max-width: 576px) {
			font-size: 22px;

			code {
				font-size: 20px;
			}
		}
	}
`;