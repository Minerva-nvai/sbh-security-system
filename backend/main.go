package main

import (
	"log"
	"net/http"
	"os"
	"strings"
)

func clean_up() {
	log.Printf("Server stopped")
	log.Printf("Cleaning up resources")
	log.Printf("Exiting application")
	os.Exit(0)
}

func main() {
	hls_dir := "./hls"

	if _, err := os.Stat(hls_dir); os.IsNotExist(err) {
		log.Printf("Directory does not exist: %v", err)
		log.Printf("Creating directory: %s", hls_dir)
		if err := os.MkdirAll("hls", os.ModePerm); err != nil {
			log.Fatalf("Failed to create directory: %v", err)
		}
	}

	fs := http.FileServer(http.Dir(hls_dir))
	http.HandleFunc("/hls/", func(w http.ResponseWriter, r *http.Request) {
		// Set CORS headers
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, Accept")

		// Handle preflight requests
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		if strings.HasSuffix(r.URL.Path, ".m3u8") {
			w.Header().Set("Content-Type", "application/vnd.apple.mpegurl")
		} else if strings.HasSuffix(r.URL.Path, ".ts") {
			w.Header().Set("Content-Type", "video/mp2t")
		}

		http.StripPrefix("/hls/", fs).ServeHTTP(w, r)
	})

	port := ":8080"

	log.Printf("Starting server on %s", port)
	if err := http.ListenAndServe(port, nil); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}

	log.Printf("Server started on %s", port)
	defer clean_up()
}
