"use client";

import useNavState from "@/hooks/useNavState";
import { ArrowRightIcon } from "@/icons";
import { Button } from "@/ui";

const HeaderLeft = () => {
  const navigationMenu = useNavState();

  return (
    <div className="md:hidden">
      <Button
        onClick={navigationMenu.toggle}
        variant="icon"
      >
        <ArrowRightIcon />
      </Button>
    </div>
  );
};

export default HeaderLeft;
