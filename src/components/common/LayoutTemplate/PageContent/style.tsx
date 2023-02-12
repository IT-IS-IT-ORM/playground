import styled from 'styled-components';

export const PageContentStyled = styled.main`
	flex-grow: 1;

	border-top-right-radius: inherit;
	border-bottom-right-radius: inherit;
	background: #0f0c29;
	background: linear-gradient(45deg, #24243e, #302b63, #0f0c29);

	@media screen and (max-width: 860px) {
		border-top-left-radius: inherit;
		border-bottom-left-radius: inherit;
	}

	> * {
		height: 100%;
	}
`;