import styled from "styled-components";
interface inputProps {
  showError: boolean;
}
export const Input = styled.input<inputProps>`
  background: #fff 0 0 no-repeat padding-box;
  border: 1px solid ${(props) => (props.showError ? "#ad0808" : "#e2e2e2")};
  border-radius: 6px;
  height: 39px;
  outline: none;
  padding: 5px;
  width: 100%;
  font: normal normal normal 12px/16px MontserratRegular;
  &:hover {
    border-color: var(--color-four);
  }
`;

export const InputTwo = styled.input`
  background: var(--color-one);
  width: 100%;
  border-radius: 8px;
  border: none;
  height: 35px;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 13px;
  font: normal normal normal 12px/16px MontserratRegular;
`;
