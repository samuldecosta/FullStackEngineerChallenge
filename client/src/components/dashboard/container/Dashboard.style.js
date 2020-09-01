import { css } from "styled-components";
import { DESKTOP, MOBILE } from "../../../theme/constants";

const DashboardStyles = css`
  .header-sticky {
    margin-left: -15px;
    z-index: 2;
    position: fixed;
    top: 0;
    width: 970px;
    background: #ffd328d9;
  }

  .mobile-header {
    margin-top: 85px;
  }

  .sub-heading {
    box-shadow: 0 8px 6px -6px #7c5f00;
    padding-bottom: 10px;
    font-size: 14px;
  }
  .feed-req-wrapper {
    width: 100%;

    & .feedback-form {
      background: #ffd533c9;
      & textarea {
        background: #ffea98de;
      }
    }
    & table {
      display: table;

      & tr {
        & td,
        & th {
          text-transform: capitalize;
          font-weight: bold;
          color: #746100;
        }

        & .reject-feedback {
          font-weight: normal;
        }
      }
      & tr:nth-child(odd) {
        display: table-row;
        justify-content: space-between;
        background: #ffea98de;
      }

      & tr:nth-child(even) {
        display: table-row;
        justify-content: space-between;
        background: #e5b600d6;
      }

      & thead {
        & tr {
          background: #dab00a !important;
        }
      }
      & td,
      & th {
        font-size: 14px;
        text-align: center;
        vertical-align: middle;
      }

      & .review-link a {
        font-weight: bold;
        color: #746100;
      }

      & .review-link a:hover,
      & .review-link a:focus {
        text-decoration: none;
      }
    }
  }
  .no-records {
    margin-top: 100px;
    text-align: center;
    & img {
      width: 300px;
    }
    & .no-record-msg {
      display: block;
      font-size: 20px;
      font-weight: 700;
      color: #979797;
    }
  }
`;

export default {
  [DESKTOP]: css`
    ${DashboardStyles};
    ${(props) => (props.inheritedStyles ? props.inheritedStyles[DESKTOP] : "")};
  `,
  [MOBILE]: css`
    ${DashboardStyles};
    ${(props) => (props.inheritedStyles ? props.inheritedStyles[MOBILE] : "")};
  `,
};
