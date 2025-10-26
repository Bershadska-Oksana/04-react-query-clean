import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import type { Movie } from "../../types/movie";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const modalRoot =
  typeof document !== "undefined"
    ? document.getElementById("modal-root")
    : null;

const MovieModal: React.FC<MovieModalProps> = ({ movie, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!modalRoot) return null;

  const imageUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
    : movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x280?text=No+Image";

  return createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.75)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: 16,
      }}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        style={{
          backgroundColor: "#fff",
          borderRadius: 8,
          maxWidth: 900,
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          position: "relative",
          padding: 20,
          boxSizing: "border-box",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            border: "none",
            background: "transparent",
            fontSize: 20,
            cursor: "pointer",
          }}
        >
          ✖
        </button>

        <h2 style={{ marginTop: 0 }}>{movie.title}</h2>

        <img
          src={imageUrl}
          alt={movie.title}
          style={{ width: "100%", borderRadius: 6, marginBottom: 12 }}
        />

        <p style={{ marginBottom: 12 }}>
          {movie.overview || "No description available."}
        </p>

        <p style={{ fontWeight: 600 }}>
          Rating: {movie.vote_average?.toFixed(1) ?? "N/A"}
        </p>
        <p>Release date: {movie.release_date ?? "Unknown"}</p>
      </div>
    </div>,
    modalRoot
  );
};

export default MovieModal;
