import { css } from "styled-components";
import { DESKTOP, MOBILE } from "../../../theme/constants";

const EmployeeListStyles = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  .employee-card {
    padding: 10px;
    min-height: 50px;
    margin-right: 2%;
    margin-bottom: 15px;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.12), 0 4px 4px 0 rgba(0, 0, 0, 0.24);
    -webkit-transition-duration: 0.2s;
    transition-duration: 0.2s;
    background: #ffd533c9;
    &:hover {
      cursor: pointer;
      text-decoration: none;
    }
    & .emp-details {
      margin-left: 35px;
      & a {
        color: #6c7403;
        font-size: 15px;
      }
      & a:hover {
        text-decoration: none;
      }
      & p {
        font-size: 12px;
      }
    }
  }
  .employee-card:nth-child(3n + 0) {
    margin-right: 0;
  }
  img {
    width: auto;
  }
  .details {
    width: 30%;
    display: inline-block;
  }
`;

export default {
  [DESKTOP]: css`
    ${EmployeeListStyles};
    ${(props) => (props.inheritedStyles ? props.inheritedStyles[DESKTOP] : "")};
  `,
  [MOBILE]: css`
    ${EmployeeListStyles};
    ${(props) => (props.inheritedStyles ? props.inheritedStyles[MOBILE] : "")};
  `,
};
