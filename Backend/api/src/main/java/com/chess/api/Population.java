package com.chess.api;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

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

        List<String> moves = new ArrayList<String>();
        moves.add("1112");
        Game game1 = new Game("Fischer", moves);
        Game game2 = new Game("anand", moves);
        gameRepository.saveAll(Arrays.asList(game1, game2));
    }
}
