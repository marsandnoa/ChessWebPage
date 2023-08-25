package com.chess.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.chess.api.entities.Game;

@Repository
public interface GameRepository extends JpaRepository<Game, String> {
}