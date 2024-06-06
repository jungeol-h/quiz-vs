import "./globals.css";
export const metadata = {
  title: "퀴즈 앱",
  description: "상식 퀴즈를 풀어보세요",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
