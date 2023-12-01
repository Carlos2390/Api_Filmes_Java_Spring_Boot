package api.filmes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FilmesService {
    @Autowired
    private FilmesRepository filmeRepository;

    public List<Filmes> listarTodosFilmes() {
        return filmeRepository.findAll();
    }

    public Optional<Filmes> encontrarPorId(Long id) {
        return filmeRepository.findById(id);
    }

    public Filmes salvarFilme(Filmes filme) {
        return filmeRepository.save(filme);
    }

    public void deletarFilme(Long id) {
        filmeRepository.deleteById(id);
    }

    public Filmes atualizarFilme(Long id, Filmes filmeAtualizado){
        Filmes filmeExistente = encontrarPorId(id).orElse(null);

        if (filmeExistente != null) {
            // Atualize manualmente os campos desejados
            if (filmeAtualizado.getTitulo() != null) {
                filmeExistente.setTitulo(filmeAtualizado.getTitulo());
            }
            if (filmeAtualizado.getDescricao() != null) {
                filmeExistente.setDescricao(filmeAtualizado.getDescricao());
            }
            if (filmeAtualizado.getImdb() != null) {
                filmeExistente.setImdb(filmeAtualizado.getImdb());
            }
            if (filmeAtualizado.getImagem() != null) {
                filmeExistente.setImagem(filmeAtualizado.getImagem());
            }
            if (filmeAtualizado.getAno() != 0) {
                filmeExistente.setAno(filmeAtualizado.getAno());
            }
            if (filmeAtualizado.getDuracao() != null) {
                filmeExistente.setDuracao(filmeAtualizado.getDuracao());
            }

            // Salve e retorne o filme atualizado
            return filmeRepository.save(filmeExistente);
        } else {
            // Filme não encontrado, retorne um status 404
            return null;
        }
    }
}

