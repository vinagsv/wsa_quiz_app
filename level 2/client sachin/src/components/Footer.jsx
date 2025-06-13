function Footer() {
    return (
        <footer className="footer sm:footer-horizontal footer-center bg-base-200/80 text-base-content p-4 flex-none">
            <aside>
                <p>Copyright © {new Date().getFullYear()} - All right reserved by WSA</p>
            </aside>
        </footer>
    )
}

export default Footer