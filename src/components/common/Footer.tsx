export default function Footer({ status }: { status: FooterStatusType }) {
  return (
    <footer
      className={`${
        status === "default" ? "bg-gray-100" : "bg-black01"
      } w-full py-6 text-center`}
    >
      {/* 네비게이션 링크 */}
      <nav
        className={`${
          status === "default" ? "text-gray01" : "text-white"
        } flex justify-center space-x-8 font-sofiaSans`}
      >
        <a href="/about" className="hover:underline">
          about
        </a>
        <a href="/blog" className="hover:underline">
          blog
        </a>
        <a
          href="https://github.com/prgrms-web-devcourse-final-project/WEB2_3_BlockB_FE"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          github
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          linkedin
        </a>
      </nav>

      {/* 저작권 문구 */}
      <p
        className={`${
          status === "default" ? "text-gray01" : "text-white"
        } mt-4 text-lg font-unifrakturCook`}
      >
        copyright | website made by team BlockB
      </p>
    </footer>
  )
}
