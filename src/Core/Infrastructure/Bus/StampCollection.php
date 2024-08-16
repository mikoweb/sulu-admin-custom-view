<?php

namespace App\Core\Infrastructure\Bus;

use Ramsey\Collection\AbstractCollection;
use Symfony\Component\Messenger\Stamp\DelayStamp;
use Symfony\Component\Messenger\Stamp\StampInterface;

/**
 * @extends AbstractCollection<StampInterface>
 */
class StampCollection extends AbstractCollection
{
    public function getType(): string
    {
        return StampInterface::class;
    }

    /**
     * @param StampInterface[] $stamps
     */
    public static function createWithDelay(int $delayMs, array $stamps = []): self
    {
        $collection = new self($stamps);
        $collection->add(new DelayStamp($delayMs));

        return $collection;
    }
}
