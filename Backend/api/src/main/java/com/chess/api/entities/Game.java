package com.chess.api.entities;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    private String name;
    @Column(name = "moves")
    private List<Integer> moves;

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Integer> getMoves() {
        return this.moves;
    }

    public void setMoves(List<Integer> moves) {
        this.moves = moves;
    }

    public Game() {
    }

    public Game(String name, List<Integer> moves) {
        this.name = name;
        this.moves = moves;
    }

}