import * as React from "react";

const chatOpenContext = React.createContext({
  data: {
    header: null,
    messages: [],
  },
  setUpdateOpenChat: (_dataMessage: { header: null; messages: [] }) => {},
});

export default chatOpenContext;
