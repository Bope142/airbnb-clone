"use client";
import React, { useEffect, useState } from "react";

interface ClientProps {
  children: React.ReactNode;
}
function ClientOnly({ children }: ClientProps) {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }
  return <>{children}</>;
}

export default ClientOnly;
