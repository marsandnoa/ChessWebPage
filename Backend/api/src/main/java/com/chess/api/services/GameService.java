package com.chess.api.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chess.api.entities.Game;
import com.chess.api.repositories.GameRepository;

@Service
public class GameService {
    @Autowired
    private GameRepository gameRepository;

    public void createGame(Game Game) {
        this.gameRepository.save(Game);
    }

    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }

    public Game getGameById(String id) {
        Optional<Game> Game = gameRepository.findById(id);
        if (Game.isPresent()) {
            return Game.get();
        }
        return null;
    }

    public boolean deleteGameById(String id) {
        if (gameRepository.existsById(id)) {
            gameRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

}
