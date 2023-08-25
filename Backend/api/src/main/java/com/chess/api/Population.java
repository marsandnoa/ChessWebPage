package com.chess.api;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.chess.api.entities.Game;
import com.chess.api.repositories.GameRepository;

@Component
public class Population implements CommandLineRunner {
    @Autowired
    private GameRepository gameRepository;

    @Override
    public void run(String... args) throws Exception {

        Game game1 = new Game("Fischer", "Kasparov");
        Game game2 = new Game("Magnus", "Anand");

        gameRepository.saveAll(Arrays.asList(game1, game2));
    }
}
