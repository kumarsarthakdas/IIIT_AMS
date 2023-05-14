import React from "react";
import { useRouterContext, TitleProps } from "@pankod/refine-core";
import { Button } from "@pankod/refine-mui";

import { logo, iiit_ams } from 'logos';

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
  const { Link } = useRouterContext();

  return (
    <Button fullWidth variant="text" disableRipple>
      <Link to="/">
        {collapsed ? (
          <img src={logo} alt="IIIT AMS" width="28px" />
        ) : (
          <img src={iiit_ams} alt="IIIT AMS" width="140px" />
        )}
      </Link>
    </Button>
  );
};
