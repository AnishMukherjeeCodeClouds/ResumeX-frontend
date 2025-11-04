import { Image, View } from "@react-pdf/renderer";
import React from "react";

export function MailIcon() {
  return (
    <Image
      src={"/icons/email.png"}
      source={"/icons/email.png"}
      style={{ height: 12, width: 12 }}
    />
  );
}

export function MailIconLight() {
  return (
    <Image
      src={"/icons/email-light.png"}
      source={"/icons/email-light.png"}
      style={{ height: 12, width: 12 }}
    />
  );
}

export function PhoneIcon() {
  return (
    <Image
      src={"/icons/phone.png"}
      source={"/icons/phone.png"}
      style={{ height: 12, width: 12 }}
    />
  );
}

export function PhoneIconLight() {
  return (
    <Image
      src={"/icons/phone-light.png"}
      source={"/icons/phone-light.png"}
      style={{ height: 12, width: 12 }}
    />
  );
}

export function LocationIcon() {
  return (
    <Image
      src={"/icons/location.png"}
      source={"/icons/location.png"}
      style={{ height: 12, width: 12 }}
    />
  );
}

export function LocationIconLight() {
  return (
    <Image
      src={"/icons/location-light.png"}
      source={"/icons/location-light.png"}
      style={{ height: 12, width: 12 }}
    />
  );
}

export function LinkedinIcon() {
  return (
    <Image
      src={"/icons/linkedin.png"}
      source={"/icons/linkedin.png"}
      style={{ height: 12, width: 12 }}
    />
  );
}

export function LinkedinIconLight() {
  return (
    <Image
      src={"/icons/linkedin-light.png"}
      source={"/icons/linkedin-light.png"}
      style={{ height: 12, width: 12 }}
    />
  );
}

export function GithubIcon() {
  return (
    <Image
      src={"/icons/github.png"}
      source={"/icons/github.png"}
      style={{ height: 12, width: 12 }}
    />
  );
}

export function GithubIconLight() {
  return (
    <Image
      src={"/icons/github-light.png"}
      source={"/icons/github-light.png"}
      style={{ height: 12, width: 12 }}
    />
  );
}

export function WebIcon() {
  return (
    <Image
      src={"/icons/web.png"}
      source={"/icons/web.png"}
      style={{ height: 12, width: 12 }}
    />
  );
}

export function WebIconLight() {
  return (
    <Image
      src={"/icons/web-light.png"}
      source={"/icons/web-light.png"}
      style={{ height: 12, width: 12 }}
    />
  );
}

export function LinkIcon() {
  return (
    <Image
      src={"/icons/link.png"}
      source={"/icons/link.png"}
      style={{ height: 12, width: 12 }}
    />
  );
}

export function IconWithText({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: React.ReactNode;
}) {
  return (
    <View style={{ flexDirection: "row", gap: 3, alignItems: "center" }}>
      {icon}
      {text}
    </View>
  );
}
