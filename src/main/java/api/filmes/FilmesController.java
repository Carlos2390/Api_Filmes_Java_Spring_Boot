package api.filmes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/filmes")
public class FilmesController {
    @Autowired
    private FilmesService filmeService;

    @GetMapping
    public List<Filmes> listarFilmes() {
        return filmeService.listarTodosFilmes();
    }

    @GetMapping("/{id}")
    public Filmes encontrarFilmePorId(@PathVariable Long id) {
        return filmeService.encontrarPorId(id).orElse(null);
    }
    

    @PostMapping
    public Filmes salvarFilme(@RequestBody Filmes filme) {
        return filmeService.salvarFilme(filme);
    }

    @DeleteMapping("/{id}")
    public void deletarFilme(@PathVariable Long id) {
        filmeService.deletarFilme(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Filmes> atualizarFilme(@PathVariable Long id, @RequestBody Filmes filmeAtualizado) {
        Filmes filmeAtualizadoSalvo = filmeService.atualizarFilme(id, filmeAtualizado);

        if (filmeAtualizadoSalvo != null) {
            return new ResponseEntity<>(filmeAtualizadoSalvo, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
