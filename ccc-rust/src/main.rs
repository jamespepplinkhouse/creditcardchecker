use luhn2::validate;
use rayon::prelude::*;
use std::env;
use std::fs::File;
use std::io::{BufRead, BufReader, Write};

fn main() {
    let args: Vec<String> = env::args().collect();
    let input_file_arg = &args[1];
    let output_file_arg = &args[2];

    let input_file = File::open(input_file_arg)
        .expect(&format!("Cannot open the input file: {}", input_file_arg));

    let cards: Vec<String> = BufReader::new(input_file)
        .lines()
        .filter_map(|result| result.ok())
        .collect();

    let results: Vec<String> = cards
        .par_iter()
        .map(|card| {
            let validity = match validate(card.parse::<u64>().unwrap()) {
                false => "invalid",
                true => "valid",
            };

            let card_type = match card {
                x if (x.len() == 13 || x.len() == 16) && &x[..1] == "4" => "VISA",
                x if x.len() == 16 && (&x[..2] == "51" || &x[..2] == "55") => "MasterCard",
                x if x.len() == 16 && &x[..4] == "6011" => "Discover",
                x if x.len() == 15 && (&x[..2] == "34" || &x[..2] == "37") => "AMEX",
                _ => "Unknown",
            };

            format!("{}: {} ({})", card_type, card, validity)
        })
        .collect();

    let mut output = File::create(output_file_arg)
        .expect(&format!("Cannot create output file: {}", output_file_arg));

    write!(output, "{}\n", results.join("\n"))
        .expect(&format!("Cannot wrtie output file: {}", output_file_arg));
    ()

    // No parallel - not too bad performance!
    // let mut result = String::new();
    // cards.iter().for_each(|card| {
    //     let validity = match validate(card.parse::<u64>().unwrap()) {
    //         false => "invalid",
    //         true => "valid",
    //     };

    //     result.push_str(&format!("MasterCard: {} ({})\n", card, validity));
    // });

    // let mut output = File::create(output_file_arg).expect("Cannot create output file!");
    // write!(output, "{}\n", result).expect("Cannot write output file!")
}
