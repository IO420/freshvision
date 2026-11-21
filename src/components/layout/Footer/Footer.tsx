import Image from "next/image";
import { Terminal, Cpu, Atom, Zap, Leaf } from "lucide-react";
import styles from "./Footer.module.css";

interface FooterProps {
  githubRepoUrl?: string;
  githubRepoUrl2?: string;
}

const TECH_STACK = [
  { name: "Python", icon: <Terminal size={15} className={styles.stackIcon} /> },
  { name: "TensorFlow", icon: <Cpu size={15} className={styles.stackIcon} /> },
  { name: "React", icon: <Atom size={15} className={styles.stackIcon} /> },
  { name: "FastAPI", icon: <Zap size={15} className={styles.stackIcon} /> },
];

function GithubMark({ size = 19 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
    </svg>
  );
}

export function Footer({
  githubRepoUrl = "#arquitectura-ia",
  githubRepoUrl2 = "#arquitectura-ia2",
}: FooterProps) {
  return (
    <footer id="arquitectura-ia" className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topGrid}>
          {/* Columna 1: Marca */}
          <div className={styles.brandCol}>
            <div className={styles.brandRow}>
              <Image
                src="/images/branding/freshvision-symbol.svg"
                alt="Logotipo freshVision"
                width={30}
                height={30}
              />
              <span className={styles.brandText}>
                <span className={styles.brandFresh}>fresh</span>
                <span className={styles.brandVision}>Vision</span>
              </span>
            </div>
            <p className={styles.tagline}>Tecnología que mantiene lo natural</p>
          </div>

          {/* Columna 2: Stack Tecnológico */}
          <div>
            <h3 className={styles.colTitle}>Stack Tecnológico:</h3>
            <div className={styles.stackGrid}>
              {TECH_STACK.map((tech) => (
                <div key={tech.name} className={styles.stackBadge}>
                  {tech.icon}
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Columna 3: GitHub */}
          <div>
            <h3 className={styles.colTitle}>Código Fuente:Front</h3>
            <a
              href={githubRepoUrl}
              target="_blank"
              className={styles.repoCard}
              aria-label="Repositorio público del proyecto en GitHub"
            >
              <span className={styles.githubIconBox}>
                <GithubMark size={19} />
              </span>
              <div>
                <div className={styles.repoTitle}>Repositorio en GitHub</div>
                <div className={styles.repoSubtitle}>
                  Repositorio público del proyecto
                </div>
              </div>
            </a>
          </div>

          <div>
            <h3 className={styles.colTitle}>Código Fuente:Api</h3>
            <a
              href={githubRepoUrl2}
              target="_blank"
              className={styles.repoCard}
              aria-label="Repositorio público del proyecto en GitHub"
            >
              <span className={styles.githubIconBox}>
                <GithubMark size={19} />
              </span>
              <div>
                <div className={styles.repoTitle}>Repositorio en GitHub</div>
                <div className={styles.repoSubtitle}>
                  Repositorio público del proyecto
                </div>
              </div>
            </a>
          </div>
        </div>

        <hr className={styles.divider} />

        <div className={styles.bottomRow}>
          <p>© 2026 freshVision. Todos los derechos reservados.</p>

          <div className={styles.motto}>
            <Leaf size={15} className={styles.leafIcon} />
            <span>Innovación • Frescura • Tecnología</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
