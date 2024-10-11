import { AppRoutes, Routes } from "@/enum";
import { Button } from "@/ui";
import Link from "next/link";

const BottomOptions = () => {
  return (
    <>
      <div className="text-sm text-center">
        By signing up, you agree to our{" "}
        <Link
          href={Routes.PRIVACY_POLICY}
          target="_blank"
          className="text-primary"
        >
          Privacy Policy
        </Link>
      </div>
      <div className="text-sm text-center">
        <div className="text-sm">Already have an account? </div>
        <Button
          href={AppRoutes.LOGIN}
          variant="text"
          size="sm"
        >
          Sign in
        </Button>
      </div>
    </>
  );
};

export default BottomOptions;
