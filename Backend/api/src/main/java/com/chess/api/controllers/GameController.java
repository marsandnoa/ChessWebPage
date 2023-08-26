package com.chess.api.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.chess.api.entities.Game;
import com.chess.api.services.GameService;

@RestController
public class GameController {
    @Autowired
    GameService GameServ;

    @PostMapping("/new")
    public void addGame(@RequestBody Game Game) {
        this.GameServ.createGame(Game);
    }

    @GetMapping("/findall")
    public List<Game> findAllGames() {
        return this.GameServ.getAllGames();
    }

    @GetMapping("/findid/{id}")
    public Game findGameById(@PathVariable Integer id) {
        return this.GameServ.getGameById(id);
    }

    @DeleteMapping("/delete/{id}")
    public void removeGame(@PathVariable Integer id) {
        this.GameServ.deleteGameById(id);
    }
}
