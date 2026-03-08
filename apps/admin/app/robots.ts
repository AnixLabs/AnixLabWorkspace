export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: ["/"], // disallow all
      },
    ],
  };
}
