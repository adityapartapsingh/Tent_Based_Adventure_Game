const express = require('express');
const app = express();
const PORT = 3000;

const storyData = {
    1: { text: "You stand before a tattered nylon tent as the mountain mist rolls in.", next: 2 },
    2: { text: "A faint, rhythmic thumping vibrates from beneath the heavy rainfly.", next: 3 },
    3: { text: "You notice a jagged tear near the base, leaking a strange golden light.", next: 4 },
    4: { text: "The smell of ozone and old parchment wafts through the zipper teeth.", next: 5 },
    5: { text: "A shadow moves across the thin fabric, taller than any human should be.", next: 6 },
    6: { text: "You hear your own name whispered from inside, but the voice sounds like static.", next: 7 },
    7: { text: "The ground around the stakes begins to turn into soft, black sand.", next: 8 },
    8: { text: "A cold hand presses against the fabric from the inside, seeking a grip.", next: 9 },
    9: { text: "The zipper begins to slide upward, inch by inch, all by itself.", next: 10 },
    10: { text: "The flap falls open, revealing a forest that wasn't there a moment ago.", next: null },
    end:{text:'You lean closer to the fabric at step ${id}... the air feels 10 degrees colder here.'}
};

// Story Route
app.get('/story/:id', (req, res) => {
    const id = req.params.id;
    const line = storyData[id];
    if(id =='end'){
          return res.send(line)
    }

    if (line) {
             res.json({
            story_line: line.text,
            options: [
                { action: "lean", url: `story/end` },
                { action: "entry", url: line.next ? `/story/${line.next}` : "/end" }
            ]
        });
    } else {
        res.status(404).json({ error: "Story ended or ID not found." });
    }
});

app.listen(PORT, () => {
    console.log(`Adventure API running at http://localhost:${PORT}`);
});