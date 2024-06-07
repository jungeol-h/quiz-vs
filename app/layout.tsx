import "./globals.css";
export const metadata = {
  title: "퀴즈 앱",
  description: "상식 퀴즈를 풀어보세요",
};
interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="ko">
      <body>
        <div className="navbar bg-neutral text-neutral-content justify-center">
          <a className="btn btn-ghost text-xl">GPT 상식 대결</a>
        </div>
        {children}
      </body>
    </html>
  );
}
