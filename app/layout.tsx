/* Components */
import { Providers } from "@/lib/providers";
import { Nav } from "./components/Nav";

/* Instruments */
import styles from "./styles/layout.module.css";
import "./styles/globals.css";
import { FooterBar } from "./components/FooterBar";

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <Providers>
      <html lang="en">
        <body>
          <section className={styles.container}>
            <header className={styles.header}>
              <Nav />
            </header>

            <main className={styles.main}>{props.children}</main>

            <footer className={styles.footer}>
              <FooterBar />
            </footer>
          </section>
        </body>
      </html>
    </Providers>
  );
}
