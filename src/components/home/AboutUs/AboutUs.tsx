
'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './AboutUs.module.css';


const TEAM_MEMBERS = [
  {
    id: 1,
    name: 'Lino Eduardo Avilés Hernández',
    github: 'IO420',
  },
  {
    id: 2,
    name: 'Carlos Axel Espinosa Ramírez',
    github: 'AxelEspinoza94',
  },
 
  {
    id: 3,
    name: 'Imanol Alexy Mendez Amel',
    github: 'ImanolAL',
  },
  
  {
    id: 4,
    name: 'Luis Angel Cipres Flores',
    github: '421110016-a11y',
  },
  
  {
    id: 5,
    name: 'Ramón Mediana Hernandez',
    github: 'ramoncito<3',
  },
   {
    id: 6,
    name: 'Eduardo Yair Gonzalez Lopez',
    github: 'Imyairgonzalez',
  }
];


type TeamMember = (typeof TEAM_MEMBERS)[number];

export function AboutUs() {
  const [selectedMember, setSelectedMember] =
    useState<TeamMember | null>(null);

  const dialogRef = useRef<HTMLDialogElement>(null);

  const openProfile = (member: TeamMember) => {
    setSelectedMember(member);
  };

  const closeProfile = () => {
    dialogRef.current?.close();
    setSelectedMember(null);
  };

  useEffect(() => {
    const dialog = dialogRef.current;

    if (selectedMember && dialog && !dialog.open) {
      dialog.showModal();
    }
  }, [selectedMember]);

  return (
    <section id="about-us" className={styles.section}>
      <div className={styles.container}>
        <h2>About Us</h2>

        <p>
          Somos el equipo detrás de FreshVision, un proyecto
          que utiliza inteligencia artificial y visión por
          computadora para analizar la frescura de frutas
          y contribuir a reducir el desperdicio de alimentos.
        </p>

        <h3>Nuestro Equipo</h3>

        <div className={styles.teamGrid}>
          {TEAM_MEMBERS.map((member) => (
            <button
              key={member.id}
              type="button"
              className={styles.member}
              onClick={() => openProfile(member)}
              aria-label={`Ver información de ${member.name}`}
            >
              {member.name}
            </button>
          ))}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className={styles.modal}
        aria-labelledby="member-profile-title"
        onClose={() => setSelectedMember(null)}
        onClick={(event) => {
          if (event.target === dialogRef.current) {
            closeProfile();
          }
        }}
      >
        {selectedMember && (
          <div className={styles.modalContent}>
            <button
              type="button"
              className={styles.closeButton}
              onClick={closeProfile}
              aria-label="Cerrar perfil"
            >
              ×
            </button>

            <span className={styles.modalLabel}>
              PERFIL DEL INTEGRANTE
            </span>

            <div className={styles.profileHeader}>
              <div className={styles.avatar}>
                {selectedMember.name
                  .split(' ')
                  .slice(0, 2)
                  .map((part) => part.charAt(0))
                  .join('')
                  .toUpperCase()}
              </div>

              <div>
                <h2 id="member-profile-title">
                  {selectedMember.name}
                </h2>
                <span className={styles.profileSubtitle}>
                  Integrante del equipo FreshVision
                </span>
              </div>
            </div>

            <div className={styles.profileSection}>
              <h3>Acerca de mí</h3>
              <p>
                Soy parte del equipo que desarrolla
                FreshVision, un proyecto enfocado en aplicar
                 herramientas  tecnológicas para resolver 
                 problemas reales.
              </p>
            </div>

            <div className={styles.profileSection}>
              <h3>FreshVision</h3>
              <p>
                Participo en el desarrollo de una solución
                basada en inteligencia artificial y visión
                por computadora para contribuir a reducir
                el desperdicio de alimentos.
              </p>
            </div>

            <button
              type="button"
              className={styles.closeProfileButton}
              onClick={closeProfile}
            >
              Cerrar perfil
            </button>
          </div>
        )}
      </dialog>
    </section>
  );
}

