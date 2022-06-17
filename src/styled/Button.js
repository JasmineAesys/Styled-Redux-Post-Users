import styled from "styled-components";

export const Button = styled.button`
  font-size: 20px;
  margin: 10px 5px;
  padding: 0.2em 1em;
  color: ${(props) => props.color || "black"};
  background-color: ${(props) => props.bgcolor || "#E9E9ED"};
  width: 200px;
`;
